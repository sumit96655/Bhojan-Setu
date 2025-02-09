import axios from 'axios';

// GraphHopper API key - replace with your actual key
const GRAPHHOPPER_API_KEY = 'd2e11210-fc4f-45a5-9435-3448e327d27f';
const GRAPHHOPPER_API_URL = 'https://graphhopper.com/api/1/route';

export const getRouteOptimization = async (delivery) => {
    try {
        // Extract coordinates from delivery
        const pickupPoint = delivery.pickupLocation?.coordinates || [77.5946, 12.9716]; // Default to Bangalore
        const dropPoint = delivery.dropLocation?.coordinates || [77.5946, 12.9716];

        // Format points for GraphHopper API
        const points = [
            { point: pickupPoint },
            { point: dropPoint }
        ];

        // Make API request to GraphHopper
        const response = await axios.get(GRAPHHOPPER_API_URL, {
            params: {
                key: GRAPHHOPPER_API_KEY,
                points: points.map(p => p.point.join(',')).join('&points='),
                vehicle: 'car',
                locale: 'en',
                instructions: true,
                calc_points: true,
                points_encoded: false
            }
        });

        // Process and return the route data
        if (response.data && response.data.paths && response.data.paths[0]) {
            const route = response.data.paths[0];
            return {
                distance: route.distance,
                time: route.time,
                points: route.points.coordinates.map(coord => ({
                    lat: coord[1],
                    lng: coord[0]
                })),
                instructions: route.instructions
            };
        }

        throw new Error('No route found');

    } catch (error) {
        console.error('Route optimization error:', error);

        // Return a mock route for development/testing
        return {
            distance: 5000,
            time: 1200,
            points: [
                { lat: pickupPoint[1], lng: pickupPoint[0] },
                { lat: dropPoint[1], lng: dropPoint[0] }
            ],
            instructions: [
                {
                    text: "Head north",
                    distance: 2500,
                    time: 600
                },
                {
                    text: "Continue to destination",
                    distance: 2500,
                    time: 600
                }
            ]
        };
    }
};

// Get ETA based on current location and destination
export const calculateETA = (currentLocation, destination) => {
    try {
        // Mock ETA calculation (replace with actual calculation)
        const averageSpeed = 30; // km/h
        const distance = calculateDistance(currentLocation, destination);
        const timeInHours = distance / averageSpeed;
        const timeInMinutes = timeInHours * 60;

        return Math.round(timeInMinutes);
    } catch (error) {
        console.error('ETA calculation error:', error);
        return 30; // Default 30 minutes
    }
};

// Helper function to calculate distance between two points
const calculateDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lng - point1.lng);
    const lat1 = toRad(point1.lat);
    const lat2 = toRad(point2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const toRad = (value) => {
    return value * Math.PI / 180;
};

// Get optimized route for multiple stops
export const getMultiStopRoute = async (stops) => {
    try {
        // Format stops for API
        const points = stops.map(stop => ({
            point: [stop.lng, stop.lat]
        }));

        // Make API request (mock for now)
        return {
            route: points.map(p => ({
                lat: p.point[1],
                lng: p.point[0]
            })),
            totalDistance: 15000,
            totalTime: 3600,
            stopSequence: stops.map((_, index) => index)
        };
    } catch (error) {
        console.error('Multi-stop route optimization error:', error);
        return null;
    }
}; 