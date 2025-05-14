import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export function Header() {
    return (
        <div className="header">
            <img src="../src/assets/Logo.svg" alt="" />
        </div>
    )
}

export function GitInfo() {
    return (
        <div className="personal-info">
            <div className="data">
                <img src="https://github.com/FelipeSoares09.png" alt="" />
                <div className="name">
                    <h1>Felipe Soares</h1>
                    <p>Student of Analysis and Systems Development and Front-End intern</p>
                    <aside>
                        <div>
                            <FontAwesomeIcon icon={faGithub} style={{ color: 'var(--blue-200)' }} />
                            <span>FelipeSoares09</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--blue-200)' }} />
                            <span>Talk2Buy</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserGroup} style={{ color: 'var(--blue-200)' }} />
                            <span>14 seguidores</span>
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

                <span style={{ color: 'var(--blue-100)' }}>6 publicações</span>
            </div>

            <div className="text-input">
                <input type="text" placeholder="Buscar conteúdo" />
            </div>
        </div>
    )
}

export function Post() {
    return (
        <section>
            <div className="posts-line-1">
                <div>
                    <h1>Publicação 1</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nam saepe rem laboriosam molestias quidem accusamus tenetur possimus inventore ipsum incidunt labore accusantium quisquam reiciendis dicta quas distinctio, cumque quasi.</p>
                </div>
                <div>
                    <h1>Publicação 2</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, cumque. Similique magni provident porro quis id impedit maiores expedita dolorum eos consequatur cumque rerum mollitia necessitatibus, nobis minima quae itaque.</p>
                </div>
            </div>
            <div className="posts-line-2">
               <div>
                    <h1>Publicação 3</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nam saepe rem laboriosam molestias quidem accusamus tenetur possimus inventore ipsum incidunt labore accusantium quisquam reiciendis dicta quas distinctio, cumque quasi.</p>
                </div>
                <div>
                    <h1>Publicação 4</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, cumque. Similique magni provident porro quis id impedit maiores expedita dolorum eos consequatur cumque rerum mollitia necessitatibus, nobis minima quae itaque.</p>
                </div> 
            </div>
            <div className="posts-line-3">
                <div>
                    <h1>Publicação 5</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nam saepe rem laboriosam molestias quidem accusamus tenetur possimus inventore ipsum incidunt labore accusantium quisquam reiciendis dicta quas distinctio, cumque quasi.</p>
                </div>
                <div>
                    <h1>Publicação 6</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, cumque. Similique magni provident porro quis id impedit maiores expedita dolorum eos consequatur cumque rerum mollitia necessitatibus, nobis minima quae itaque.</p>
                </div> 
            </div>
        </section>
        
    )
}


export function Home() {
    return (
        <>
            <Header />
            <GitInfo />
            <Search />
            <Post />
        </>
    )
}