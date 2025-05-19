import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'
import { fetchIssues } from '../axios/issues'
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import './Home.css'

type Issue = {
    id: number;
    number: number;
    title: string;
    body: string;
    user: { login: string };
    labels: { name: string }[];
    created_at: string;
};

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

export function Search({ total, search, setSearch }: { total: number, search: string, setSearch: (value: string) => void }) {
    return (
        <div className="text-input">
            <div className="filter">
                <span style={{ color: 'var(--grey-200)' }}>Publicações</span>
                <span style={{ color: 'var(--blue-100)' }}>
                    {total} publicaçõe{total !== 1 ? 's' : ''}
                </span>
            </div>
            <input
                type="text"
                placeholder="Buscar conteúdo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export function Post({ issues }: { issues: any[] }) {
    const navigate = useNavigate();

    return (
        <section>
            <div className="posts-line-1">
                {issues.map((issue) => {
                    const preview = issue.body.length > 250
                        ? issue.body.slice(0, 250) + '...'
                        : issue.body;

                    const rawtimeAgo = formatDistanceToNow(new Date(issue.created_at), {
                        addSuffix: true,
                        locale: ptBR,
                    });

                    const timeAgo = rawtimeAgo.charAt(0).toUpperCase() + rawtimeAgo.slice(1);

                    return (
                        <div
                            key={issue.id}
                            onClick={() => navigate(`/post-one/${issue.number}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h1>{issue.title}</h1>
                            <p>{preview}</p>
                            <span style={{ color: 'var(--grey-200)', fontSize: '12px' }}>
                                {timeAgo}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function Home() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function loadIssues() {
            const data = await fetchIssues();
            setIssues(data);
            console.log(data);
        }
        loadIssues();
    }, []);

    const filteredIssues = issues.filter(issue =>
        (issue.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (issue.body || '').toLowerCase().includes(search.toLowerCase()) ||
        (issue.user?.login || '').toLowerCase().includes(search.toLowerCase()) ||
        (issue.labels || []).some(label => (label.name || '').toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
            <Header />
            <GitInfo />
            <Search total={issues.length} search={search} setSearch={setSearch} />
            <Post issues={filteredIssues} />
        </>
    );
}