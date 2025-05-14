import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export function Header() {
    return (
        <div>
            <img src="../src/assets/Logo.svg" alt="" />
        </div>
    )
}

export function PersonalInfo() {
    return (
        <div>
            <img src="https://github.com/FelipeSoares09.png" alt="" />
            <h1>Felipe Soares</h1>
            <p>Student of Analysis and Systems Development and Front-End intern</p>
            <div>
                <FontAwesomeIcon icon={faBuilding} />
                <span>Talk2Buy</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faGithub} />
                <span>FelipeSoares09</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>14</span>
            </div>
        </div>
    )
}

export function Search() {
    return (
        <div>
            <h1>Publicações</h1>
            <span>2 publicações</span>

            <div>
                <input type="text" placeholder="Buscar conteúdo" />
            </div>
        </div>
    )
}

export function Post() {
    return (
        <section>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nam saepe rem laboriosam molestias quidem accusamus tenetur possimus inventore ipsum incidunt labore accusantium quisquam reiciendis dicta quas distinctio, cumque quasi.</div>
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, cumque. Similique magni provident porro quis id impedit maiores expedita dolorum eos consequatur cumque rerum mollitia necessitatibus, nobis minima quae itaque.</div>
        </section>
    )
}


export function Home() {
    return (
        <>
            <Header />
            <PersonalInfo />
            <Search />
            <Post />
        </>
    )
}