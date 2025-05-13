import { Coffee, MapPin, Package, ShoppingCart, Timer } from "phosphor-react"
import { Aside, CoffeeImg, CoffeeList, CoffeeStyle, Container, ContainerTag, Control, Description, Heading, Info, Price, Tags, Title, TitleContent, TitleTag } from "./indexcss"
import { useTheme } from "styled-components"
import { useContext, useState } from "react"
import { DataContext } from "../../context/coffeeContext"
import { useNavigate } from "react-router-dom"

interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
    tags: string[];
}

export function Header() {
    const { cart, cartQuantity } = useDataContext();
    const navigate = useNavigate();
    
    return (
        <Container>
            <img src="../../public/images/logo.svg" alt="" />
            <Aside>
                <div>
                    <MapPin size={22} weight="fill" />
                    <span>São Paulo, SP</span>
                </div>
                <div>
                    <button
                        onClick={() => {
                            if (cart.length === 0) {
                                alert("Você não escolheu nenhum produto!"); // Exibe o alerta
                                return;
                            }
                            navigate("/Payment", {
                                state: { cart },
                            });
                        }}
                    >
                        <ShoppingCart size={22} weight="fill" />
                    </button>
                    <span>{cartQuantity}</span>
                </div>
            </Aside>
        </Container>
    );
}

export function Advertising() {
    const theme = useTheme()
    return (
            <div>
                <Title>
                    <TitleContent>
                        <div>
                            <Heading>
                                <h1>Encontre o café perfeito para qualquer hora do dia</h1>
                                <span>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
                            </Heading>
                            <Info>
                                <div>
                                    <ShoppingCart size={32}
                                        weight="fill"
                                        color={theme.colors.background}
                                        style={{ backgroundColor: theme.colors['base-text'] }} 
                                    />
                                    <span>Compra simples e segura</span>
                                </div>
                                <div>
                                    <Package size={32}
                                        weight="fill"
                                        color={theme.colors.background}
                                        style={{ backgroundColor: theme.colors['base-text'] }} 
                                    />
                                    <span>Embalagem mantém o café intacto</span>
                                </div>
                                <div>
                                    <Timer size={32}
                                        weight="fill"
                                        color={theme.colors.background}
                                        style={{ backgroundColor: theme.colors.yellow }}
                                    />
                                    <span>Entrega rápida e rastreada</span>
                                </div>
                                <div>
                                    <Coffee size={32}
                                        weight="fill"
                                        color={theme.colors.background}
                                        style={{ backgroundColor: theme.colors.purple }}
                                    />
                                    <span>O café chega fresquinho até você</span>
                                </div>
                            </Info>
                        </div>
                        <img src="../../public/images/imagem-cafe.svg" alt="" />
                    </TitleContent>
                </Title>
            </div>
    )
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
}

export function CoffeeListHome() {
    const { data, updateCart } = useDataContext();
    const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

    const handleIncrementQuantity = (id: string) => {
        setQuantity((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + 1, 1),
        }));
    };

    const handleDecrementQuantity = (id: string) => {
        setQuantity((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1),
        }));
    };

    const handleAddToCart = (id: string) => {
    const product = data.find((item) => item.id.toString() === id);
    if (product) {
        const updatedCartItem: CartItem = {
            ...product,
            id: product.id.toString(),
            quantity: quantity[id] || 1,
        };
        
            updateCart((prevCart: CartItem[]) => {
                const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
                if (existingItemIndex >= 0) {
                    
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].quantity += updatedCartItem.quantity;
                    return updatedCart;
                }
                
                return [...prevCart, updatedCartItem];
            });
        }
    };

    return (
        <CoffeeList>
            <h2>Nossos cafés</h2>

            <ContainerTag>
                {data.map((item) => (
                    <CoffeeStyle key={item.id}>
                        <CoffeeImg src={item.image} alt={item.title} />
                        <Tags>
                            {item.tags.map((tag: string) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </Tags>

                        <TitleTag>{item.title}</TitleTag>
                        <Description>{item.description}</Description>
                        <Control>
                            <Price>
                                <span>Preço: R$</span>
                                <span>{item.price.toFixed(2)}</span>
                            </Price>

                            <button onClick={() => handleIncrementQuantity(item.id.toString())}>+</button>
                            <span>{quantity[item.id] || 1}</span>
                            <button onClick={() => handleDecrementQuantity(item.id.toString())}>-</button>
                            <button onClick={() => handleAddToCart(item.id.toString())}>
                                <ShoppingCart size={22} weight="fill" />
                            </button>
                        </Control>
                    </CoffeeStyle>
                ))}
            </ContainerTag>
        </CoffeeList>
    );
}

export function Home() {
    return (
        <div>
            <Header />
            <Advertising />
            <CoffeeListHome />
        </div>
    )
}
