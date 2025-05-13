import { CurrencyDollar, MapPin, ShoppingCart, Timer } from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Aside, Container, ContainerDelivery, Heading, Info, InfoContent, Order } from "./indexcss";

export function Header() {
    const navigate = useNavigate();

    return (
        <Container>
            <img src="../../public/images/logo.svg" alt="" onClick={() => navigate("/")} style={{ cursor: "pointer"}}/>
            <Aside>
                <div>
                    <MapPin size={22} weight="fill" />
                    <span>São Paulo, SP</span>
                </div>
                <div>
                    <ShoppingCart size={22} weight="fill" />
                    
                </div>
            </Aside>
        </Container>
    )
}


export function Delivery() {
    const location = useLocation();
    const { address, paymentMethod } = location.state || {};

    return (
        <ContainerDelivery>
            <Order>
                <Heading>
                    <h2>Uhu! Pedido confirmado</h2>
                    <span>Agora é só aguardar que o café chegará até você.</span>
                </Heading>

                <Info>
                    <InfoContent>
                        <div>
                            <MapPin size={40} />
                            <div>
                                <span>
                                    Entrega em{' '}
                                    <strong>{address?.street}, {address?.number}</strong>
                                </span>
                                <span>
                                    {address?.neighborhood} - {address?.city}, {address?.state}
                                </span>
                            </div>
                        </div>

                        <div>
                            <Timer size={40} />
                            <div>
                                <span>Previsão de entrega</span>
                                <strong>20 min - 30 min</strong>
                            </div>
                        </div>

                        <div>
                            <CurrencyDollar size={40} />
                            <div>
                                <span>Pagamento na entrega</span>
                                <strong>{paymentMethod}</strong>
                            </div>
                        </div>
                    </InfoContent>
                </Info>
            </Order>
            <img src="../../public/images/logo-delivery.svg" alt="" />
        </ContainerDelivery>
    );
}

export function Confirmation() {
    return (
        <div>
            <Header />
            <Delivery />
        </div>
    )
}