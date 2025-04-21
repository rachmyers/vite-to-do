export const getAllTasks = async () => {
    try {
        const response = await fetch('https://localhost:7293/api/todoitems', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Re-throw the error to handle it where the function is called
    }
};



export const createTask = async () => {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React PUT Request Example' })
    };
    fetch('https://localhost:7293/api/todoitems/{id}', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
};