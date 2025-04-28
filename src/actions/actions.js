import React, { formData, useState } from 'react';

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



export const createTask = async (payload) => {
debugger;
    //const [id, setId] = useState('');
    //const [content, setContent] = useState('');

    try {
        const response = await fetch(`https://localhost:7293/api/todoitems/`, {
           
               method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                 name: "test",
                 isComplete: false
            })
            
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