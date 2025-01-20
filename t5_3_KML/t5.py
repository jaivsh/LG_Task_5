import random
import geopandas as gpd
from shapely.geometry import Point

# Load India's GeoJSON boundary
india_boundary = gpd.read_file("/Users/bhoomishukla/Documents/ind.geojson")

# Function to generate random points within India's boundary
def generate_random_points_within_boundary(boundary, n_points):
    points = []
    minx, miny, maxx, maxy = boundary.total_bounds
    
    while len(points) < n_points:
        # Generate a random point
        random_point = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
        # Check if the point is within the boundary
        if boundary.contains(random_point).any():
            points.append(random_point)
    return points

# Define three different styles for points
styles = '''
    <!-- Small Points Style (0.2) -->
    <Style id="smallPoint">
      <IconStyle>
        <scale>0.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/dot.png</href>
        </Icon>
        <color>ff00ffff</color>
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>

    <!-- Medium Points Style (0.4) -->
    <Style id="mediumPoint">
      <IconStyle>
        <scale>0.4</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/dot.png</href>
        </Icon>
        <color>ff00ffff</color>
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>

    <!-- Large Points Style (0.6) -->
    <Style id="largePoint">
      <IconStyle>
        <scale>0.6</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/dot.png</href>
        </Icon>
        <color>ff00ffff</color>
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>
'''

# KML header with dark overlay and styles
kml_header = f'''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Random Points Across India</name>
    
    <!-- Dark overlay for the whole Earth -->
    <GroundOverlay>
      <name>Dark Overlay</name>
      <color>C0000000</color>
      <altitude>0</altitude>
      <altitudeMode>clampToGround</altitudeMode>
      <LatLonBox>
        <north>90</north>
        <south>-90</south>
        <east>180</east>
        <west>-180</west>
      </LatLonBox>
    </GroundOverlay>
    {styles}
'''

kml_footer = '''
  </Document>
</kml>
'''

# Generate 100 random points
random_points = generate_random_points_within_boundary(india_boundary, 1000)

# Build KML Placemark entries with random styles
placemarks = ""
style_ids = ["smallPoint", "mediumPoint", "largePoint"]

for point in random_points:
    # Randomly choose a style
    style = random.choice(style_ids)
    placemarks += f'''
    <Placemark>
      <styleUrl>#{style}</styleUrl>
      <Point>
        <coordinates>{point.x},{point.y},0</coordinates>
      </Point>
    </Placemark>
    '''

# Combine all parts into the final KML
kml_content = kml_header + placemarks + kml_footer

# Write to a KML file
output_file = "india_random_points.kml"
with open(output_file, "w", encoding="utf-8") as file:
    file.write(kml_content)

print(f"KML file created: {output_file}")