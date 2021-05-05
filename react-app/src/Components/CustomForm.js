import React, { useState, useEffect, Component } from 'react'
import styled from 'styled-components';

const Form = styled.form`
	border: 3px solid #f1f1f1;
`; 
const Input=styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  `
  const ButtonSubmit =styled.button `
    background-color: #FA841C;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
` 

const Container =styled.div`
    padding: 16px;
  `
const ContainerForgotPws=styled(Container)`
    display: flex;
  justify-content: center;
  align-items: center;
  background-color: '#f1f1f1';
`
const FormContainer=styled.div`
    margin: 50px 300px;
    @media (max-width: 786px) {
        margin: 50px 50px;
  }
`

const Field=styled.div`
  margin: 20px 0px 0px 0px
`
class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
                <FormContainer>
                    <h2>{this.props.name}</h2>
                    <Form action="/action_page.php" method="post">
                        <Container>
                            <Field>
                                <label htmlFor="uname"><b>Username</b></label>
                                <Input type="text" placeholder="Enter Username" name="uname" required />
                            </Field>

                            <Field>
                                <label htmlFor="psw"><b>Password</b></label>
                                <Input type="password" placeholder="Enter Password" name="psw" required />
                            </Field>

                            <ButtonSubmit type="submit">{this.props.name}</ButtonSubmit>
                        </Container>
                        <ContainerForgotPws>
                            <span>{this.props.name==='Login'? 'Did not have an account?' :'Already have an account?'}</span>
                            <a href="#">  {this.props.name==='Login'?'SIGN UP?': 'LOGIN'}</a>
                        </ContainerForgotPws>
                    </Form>
                </FormContainer>
        )
    }
}
export default CustomForm