import random
import geopandas as gpd
import numpy as np
from shapely.geometry import Point

# Load India's GeoJSON boundary
india_boundary = gpd.read_file("/Users/bhoomishukla/Documents/ind.geojson")

def generate_major_cities(boundary, num_cities=6):
    cities = []
    minx, miny, maxx, maxy = boundary.total_bounds
    
    while len(cities) < num_cities:
        point = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
        if boundary.contains(point).any():
            cities.append((point.x, point.y))
    
    return cities

def calculate_min_distance(point, cities):
    """Calculate minimum distance from point to any city"""
    min_dist = float('inf')
    for city_x, city_y in cities:
        dist = np.sqrt((point[0] - city_x)**2 + (point[1] - city_y)**2)
        min_dist = min(min_dist, dist)
    return min_dist

def generate_network_points(boundary, major_cities, num_points=2000):  # Increased points for better visibility
    points = []
    minx, miny, maxx, maxy = boundary.total_bounds
    
    while len(points) < num_points:
        # Generate a random point
        x = random.uniform(minx, maxx)
        y = random.uniform(miny, maxy)
        point = Point(x, y)
        
        if boundary.contains(point).any():
            # Calculate minimum distance to any major city
            min_distance = calculate_min_distance((x, y), major_cities)
            
            # Probability decreases exponentially with distance - steeper decay
            probability = np.exp(-min_distance * 0.5)  # Increased from 0.1 to 0.5 for tighter clustering
            
            # Accept point based on probability
            if random.random() < probability:
                points.append(point)
    
    return points

# KML Generation
styles = '''
    <!-- Major City Style -->
    <Style id="majorCity">
      <IconStyle>
        <scale>0.8</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/dot.png</href>
        </Icon>
        <color>ff0000ff</color>  <!-- Red color -->
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>

    <!-- Small Points Style -->
    <Style id="smallPoint">
      <IconStyle>
        <scale>0.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/dot.png</href>
        </Icon>
        <color>ff00ffff</color>  <!-- Yellow color -->
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>
'''

kml_header = f'''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>India Network Points</name>
    
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

def main():
    # Generate points
    major_cities = generate_major_cities(india_boundary)
    network_points = generate_network_points(india_boundary, major_cities)

    # Build KML content
    placemarks = ""

    # Add major cities (in red)
    for x, y in major_cities:
        placemarks += f'''
        <Placemark>
          <styleUrl>#majorCity</styleUrl>
          <Point>
            <coordinates>{x},{y},0</coordinates>
          </Point>
        </Placemark>
        '''

    # Add network points (in yellow)
    for point in network_points:
        placemarks += f'''
        <Placemark>
          <styleUrl>#smallPoint</styleUrl>
          <Point>
            <coordinates>{point.x},{point.y},0</coordinates>
          </Point>
        </Placemark>
        '''

    # Combine all parts into the final KML
    kml_content = kml_header + placemarks + kml_footer

    # Write to a KML file
    output_file = "india_network_points.kml"
    with open(output_file, "w", encoding="utf-8") as file:
        file.write(kml_content)

    print(f"KML file created: {output_file}")

if __name__ == "__main__":
    main()