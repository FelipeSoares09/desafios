import { Bank, CreditCard, CurrencyDollar, MapPin, Money, ShoppingCart, Trash } from "phosphor-react";
import { AddressContainer, AddressForm, AddressHeading, Aside, CartTotal, CartTotalInfo, CheckoutButton, Coffee, CoffeeInfo, Container, ContainerAddress, InfoContainer, PaymentContainer, PaymentHeading, PaymentOptions, StyledInput } from "./indexcss";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";



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
                    <span>0</span>
                </div>
            </Aside>
        </Container>
    )
}

export function AddressData() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state?.cart || []);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const formRef = useRef<HTMLFormElement>(null);

    function handleConfirm() {
        const form = formRef.current;
        if (!form) return;

        const cep = form["cep"].value.trim();
        const street = form["street"].value.trim();
        const number = form["number"].value.trim();
        const neighborhood = form["neighborhood"].value.trim();
        const city = form["city"].value.trim();
        const state = form["state"].value.trim();

        if (!cep || !street || !number || !neighborhood || !city || !state) {
            alert("Por favor, preencha todos os campos obrigatórios do endereço!");
            return;
        }

        if (cart.length === 0) {
            alert("Você não escolheu nenhum produto!");
            return;
        }

        if (!paymentMethod) {
            alert("Por favor, selecione uma forma de pagamento!");
            return;
        }

        navigate("/confirmation", {
            state: { cart, paymentMethod, address: { cep, street, number, neighborhood, city, state } },
        });
    }

    function handlePaymentMethodChange(method: string) {
        setPaymentMethod(method);
    }

    function handleDeleteItem(id: string) {
        const updatedCart = cart.filter((item: { id: string }) => item.id !== id);
        setCart(updatedCart);
    
        navigate("/Payment", { state: {cart: updatedCart } });
    }

    return (
        <ContainerAddress>
            <InfoContainer>
                <h2>Complete seu pedido</h2>

                <form ref={formRef}>
                    <AddressContainer>
                        <AddressHeading>
                            <MapPin size={25} />
                            <div>
                                <span>Endereço de entrega</span>
                                <p>Informe o endereço onde deseja receber o pedido</p>
                            </div>
                        </AddressHeading>
                        <AddressForm>
                            <StyledInput type="number" placeholder="CEP" gridArea="cep" name="cep" />
                            <StyledInput placeholder="Rua" gridArea="street" name="street" />
                            <StyledInput type="text" placeholder="Número" gridArea="number" name="number" />
                            <StyledInput type="text" placeholder="Complemento (opcional)" gridArea="fullAddress" name="fullAddress" />
                            <StyledInput type="text" placeholder="Bairro" gridArea="neighborhood" name="neighborhood" />
                            <StyledInput type="text" placeholder="Cidade" gridArea="city" name="city" />
                            <StyledInput type="text" placeholder="UF" gridArea="state" name="state" />
                        </AddressForm>
                    </AddressContainer>

                    <PaymentContainer>
                        <PaymentHeading>
                            <CurrencyDollar size={22} />
                            <div>
                                <span>Pagamento</span>
                                <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar:</p>
                            </div>
                        </PaymentHeading>
                        <PaymentOptions>
                            <div>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="creditCard"
                                    onChange={() => handlePaymentMethodChange("Cartão de crédito")}
                                />
                                <CreditCard size={16} />
                                <span>Cartão de crédito</span>

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="debitCard"
                                    onChange={() => handlePaymentMethodChange("Cartão de débito")}
                                />
                                <Bank size={16} />
                                <span>Cartão de débito</span>

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="money"
                                    onChange={() => handlePaymentMethodChange("Dinheiro")}
                                />
                                <Money size={16} />
                                <span>Dinheiro</span>
                            </div>
                        </PaymentOptions>
                    </PaymentContainer>
                </form>
            </InfoContainer>

            <InfoContainer>
                <h2>Cafés selecionados</h2>

                <CartTotal>
                    <Fragment>
                        {cart.map((item: { id: string; title: string; image: string; price: number; quantity: number }) => (
                            <Coffee key={item.id}>
                                <div>
                                    <img src={item.image} alt={item.title} />
                                    <div>
                                        <span>{item.title}</span>

                                        <CoffeeInfo>
                                            <button onClick={() => handleDeleteItem(item.id)}>
                                                <Trash />
                                                <span>Remover</span>
                                            </button>
                                        </CoffeeInfo>
                                    </div>
                                </div>
                                <aside>R$ {(item.price * item.quantity).toFixed(2)}</aside>
                            </Coffee>
                        ))}
                        <span />
                    </Fragment>
                    <CartTotalInfo>
                        <div>
                            <span>Total de itens</span>
                            <span>R$ {cart.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>R$ {cart.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                        </div>
                    </CartTotalInfo>
                    <CheckoutButton onClick={handleConfirm} type="button">Confirmar pedido</CheckoutButton>
                </CartTotal>
            </InfoContainer>
        </ContainerAddress>
    );
}

export function Payment() {
    return (
        <div>
            <Header />
            <AddressData />
        </div>
    )
}