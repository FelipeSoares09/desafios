import axios from 'axios';

export async function fetchIssues() {
    try {
        const response = await axios.get('https://api.github.com/repos/FelipeSoares09/github-blog/issues', {
            headers: {
                Authorization: 'Bearer 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',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching issues:', error);
        return [];
    }
}

// Exemplo de função para buscar um issue específico
export async function fetchIssueByNumber(number: number) {
    const response = await axios.get(
        `https://api.github.com/repos/FelipeSoares09/github-blog/issues/${number}`
    );
    return response.data;
}

