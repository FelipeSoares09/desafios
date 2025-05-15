import axios from 'axios';

export async function fetchIssues() {
    try {
        const response = await axios.get('https://api.github.com/repos/FelipeSoares09/github-blog/issues');
        return response.data;
    } catch (error) {
        console.error('Error fetching issues:', error);
        return [];
    }
}

