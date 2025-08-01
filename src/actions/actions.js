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



export const createTask = async (taskText) => {
    try {
      const response = await fetch('https://localhost:7293/api/todoitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskText }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error; // rethrow to handle in UI
    }
  };

  export const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://localhost:7293/api/todoitems/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      // Only parse JSON if there is content
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  };


  export const updateTask = async (id) => {
    try {
     // eslint-disable-next-line no-debugger
     debugger;
      const getContent = formData.get('name');
      const completed = formData.get('completed') === 'true'; // Convert to boolean if needed
      
      const response = await fetch(`https://localhost:7293/api/todoitems/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: getContent,
          isComplete: completed
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };
  