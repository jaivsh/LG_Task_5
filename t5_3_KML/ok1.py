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

# Generate 100,000 random points within India's boundary
random_points = generate_random_points_within_boundary(india_boundary, 100)

# KML header with an added style for the glowing, flickering effect
kml_header = '''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Diwali Cracker Lights with Shining Effect</name>
    <description>Micro-sized cracker lights with a yellowish shine/flicker across India</description>
    <Style id="yellow-glow">
      <IconStyle>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/shaded_dot.png</href>
        </Icon>
        <color>5014F0FA</color> <!-- Semi-transparent yellow -->
        <scale>0.5</scale> <!-- Default size -->
      </IconStyle>
    </Style>
'''

kml_footer = '''
  </Document>
</kml>
'''

# Build KML Placemark entries with time-based animation for flickering
placemarks = ""
for point in random_points:
    placemarks += f'''
    <Placemark>
      <styleUrl>#yellow-glow</styleUrl>
      <TimeSpan>
        <begin>2025-01-15T00:00:00Z</begin>
        <end>2025-01-15T23:59:59Z</end>
      </TimeSpan>
      <Point>
        <coordinates>{point.x},{point.y},0</coordinates>
      </Point>
      <TimePrimitive>
        <gx:TimeStamp>
          <when>2025-01-15T00:00:00Z</when>
        </gx:TimeStamp>
      </TimePrimitive>
      <Animated>
        <Animation>
          <scale>0.5</scale> <!-- Initial size -->
          <scale>0.7</scale> <!-- Pulse to larger size -->
          <scale>0.5</scale> <!-- Shrink back -->
          <duration>0.5</duration> <!-- Duration for pulsing -->
        </Animation>
      </Animated>
    </Placemark>
    '''

# Combine all parts into the final KML
kml_content = kml_header + placemarks + kml_footer

# Write to a KML file
with open("diwali_cracker_lights_shining.kml", "w", encoding="utf-8") as file:
    file.write(kml_content)

print("KML file created: diwali_cracker_lights_shining.kml")
