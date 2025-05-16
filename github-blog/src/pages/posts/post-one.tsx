import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowUpRightFromSquare, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import { useParams, Link } from "react-router-dom";
import "./post-one.css"
import { fetchIssueByNumber } from "../../axios/issues"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function PostHeader() {
    return (
        <div className="header">
            <img src="../src/assets/Logo.svg" alt="" />
        </div>
    )
}

export function PostGitInfo({
    issueTitle,
    login,
    createdAt,
    comments
}: {
    issueTitle: string,
    login: string,
    createdAt: string,
    comments: number
}) {
    const [user, setUser] = useState({
        name: '',
        bio: '',
        login: '',
        followers: 0,
        company: ''
    });

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
    }, []);

    return (
        <div className="post-personal-info">
            <span className="span1">
                <FontAwesomeIcon icon={faChevronLeft} style={{ color: 'var(--blue)', fontSize: '12px' }} />
                <Link to="/">VOLTAR</Link>
            </span>
            <span className="span2">
                <a href="https://github.com/FelipeSoares09/Github-blog/issues/1"
                    target="_blank"
                    rel="noopener noreferrer"
                >VER NO GITHUB</a>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ color: 'var(--blue)', fontSize: '12px' }} />
            </span>
            <div>
                <div className="post-name">
                    <h1>{issueTitle}</h1>
                    <aside>
                        <div>
                            <FontAwesomeIcon icon={faGithub} style={{ color: 'var(--blue-200)' }} />
                            <span>{login}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCalendarDay} style={{ color: 'var(--blue-200)' }} />
                            <span>
                                {formatDistanceToNow(new Date(createdAt), {
                                    addSuffix: true,
                                    locale: ptBR,
                                })}
                            </span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faComment} style={{ color: 'var(--blue-200)' }} />
                            <span>{comments} comentários</span>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export function PostContent({ body }: { body: string }) {
    return (
        <div className="post-content">
            <ReactMarkdown>{body}</ReactMarkdown>
        </div>
    );
}

export function PostOne() {
    const { number } = useParams(); // pega o número do issue da URL
    const [issue, setIssue] = useState<any>(null);

    useEffect(() => {
        if (number) {
            fetchIssueByNumber(Number(number))
                .then(data => setIssue(data));
        }
    }, [number]);

    if (!issue) return <p>Loading...</p>;

    return (
        <>
            <PostHeader />
            <PostGitInfo 
                issueTitle={issue.title} 
                login={issue.user.login} 
                createdAt={issue.created_at} 
                comments={issue.comments} 
            />
            <PostContent body={issue.body} />
        </>
    )
}