import React, {useState} from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignButtonClick = () => {

    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name:'SignIn'}]
        })
    }

    return (
        <Container>
            <BarberLogo width=" 100%" height="160"/>

            <InputArea>
                <SignInput 
                        IconSvg={PersonIcon}
                        placeholder="Digite seu nome"
                        value={nameField}
                        onChangeText={t=>setNameField(t)} //possibilita mudar o texto depois de settado
                    />

                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)} //possibilita mudar o texto depois de settado
                    

                />

                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password = {true}
                />

                <CustomButton onPress={handleSignButtonClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}