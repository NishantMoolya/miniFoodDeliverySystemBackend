function dijkstra(graph, source) {
    // Initialize distances and priority queue
    const distances = {};
    const priorityQueue = new MinPriorityQueue();

    // Set initial distances to Infinity and source distance to 0
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[source] = 0;

    // Add the source node to the priority queue
    priorityQueue.enqueue(source, 0);

    while (!priorityQueue.isEmpty()) {
        // Get the node with the smallest distance
        const currentNode = priorityQueue.dequeue().element;

        // Iterate over neighbors
        graph[currentNode].forEach(neighbor => {
            const newDistance = distances[currentNode] + neighbor.weight;

            // Only consider this new path if it's better
            if (newDistance < distances[neighbor.node]) {
                distances[neighbor.node] = newDistance;
                priorityQueue.enqueue(neighbor.node, newDistance);
            }
        });
    }

    return distances;
}

// MinPriorityQueue class for managing the priority queue
class MinPriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

module.exports = { dijkstra };
