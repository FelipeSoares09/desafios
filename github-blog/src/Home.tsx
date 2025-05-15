import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'
import { fetchIssues } from './axios/issues'

export function Header() {
    return (
        <div className="header">
            <img src="../src/assets/Logo.svg" alt="" />
        </div>
    )
}

export function GitInfo() {
    const [user, setUser] = useState({
        name: '',
        bio: '',
        login: '',
        followers: 0,
        company: ''
    })

    useEffect(() => {
        fetch('https://api.github.com/users/FelipeSoares09')
            .then(response => response.json())
            .then(data => {
                setUser({
                    name: data.name,
                    bio: data.bio,
                    login: data.login,
                    followers: data.followers,
                    company: data.company
                })
            })
    }, [])

    return (
        <div className="personal-info">
            <span>
                <a href="https://github.com/FelipeSoares09"
                target="_blank"
                rel="noopener noreferrer"
                >GITHUB</a>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ color: 'var(--blue)' }} />
                </span>
                
            <div className="data">
                <img src="https://github.com/FelipeSoares09.png" alt="" />
                <div className="name">
                    <h1>Felipe Soares</h1>
                    <p>{user.bio}</p>
                    <aside>
                        <div>
                            <FontAwesomeIcon icon={faGithub} style={{ color: 'var(--blue-200)' }} />
                            <span>{user.login}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--blue-200)' }} />
                            <span>{user.company}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserGroup} style={{ color: 'var(--blue-200)' }} />
                            <span>{user.followers} followers</span>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export function Search() {
    return (
        <div>
            <div className="filter">
                <span style={{ color: 'var(--grey-200)' }}>Publicações</span>

                <span style={{ color: 'var(--blue-100)' }}>2 publicações</span>
            </div>

            <div className="text-input">
                <input type="text" placeholder="Buscar conteúdo" />
            </div>
        </div>
    )
}

export function Post({ issues }: { issues: any[] }) {
    return (
        <section>
            <div className="posts-line-1">
                {issues.map((issue) => {
                    const preview = issue.body.length > 250
                        ? issue.body.slice(0, 250) + '...' // Limita a 250 caracteres e adiciona "..."
                        : issue.body; // Exibe o texto completo se for menor que 250 caracteres

                    return (
                        <div key={issue.id}>
                            <h1>{issue.title}</h1>
                            <p>{preview}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function Home() {
    const [issues, setIssues] = useState([]); // Estado para armazenar as issues

    useEffect(() => {
        async function loadIssues() {
            const data = await fetchIssues(); // Busca as issues
            setIssues(data); // Atualiza o estado com as issues
        }
        loadIssues();
    }, []);

    return (
        <>
            <Header />
            <GitInfo />
            <Search />
            <Post issues={issues} /> {/* Passa as issues como props */}
        </>
    );
}