import React from 'react'
import {Form,Button,InputGroup,Dropdown} from 'react-bootstrap'
import Icon from 'react-web-vector-icons'
import {authLogout} from '../library/redux/auth/signOut/action'
import AuthObject from '../library/object/AuthObject'

const Header = props => {

    const {dispatch,state} = props
    
    const authObject = new AuthObject({state})

    const doLogout = () => {
        dispatch(authLogout())
    }

    const onChangePassword = () => {
        
    }

    const onHideChangePassword = () => {
        
    }

    const onSuccessChangePassword = () => {
       
    }

    const AccountToggle = React.forwardRef(({children,onClick},ref) => (
        <Button size="sm" variant="link" ref={ref} onClick={e=>{e.preventDefault();onClick(e)}}>
            {children}
        </Button>)
    )

    return (
        <>
            <div id="searchbar">
                <Form>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <Icon
                                    style={{lineHeight:1}}
                                    name="magnify"
                                    font="MaterialCommunityIcons"
                                    color="#777777"
                                    size={19}
                                    />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        
                        <Form.Control type="text" className="pl-0" placeholder="Search..."/>
                        
                    </InputGroup>
                </Form>
            </div>
            <div className="d-flex flex-row justify-content-end align-items-center pr-3">

                <Button size="sm" variant="link"  className="p-0 ml-3" onClick={()=>alert("test")}>
                    <Icon
                        name="help-circle-outline"
                        font="MaterialCommunityIcons"
                        color="#777777"
                        size={25}/>
                </Button>
                <Button size="sm" variant="link"  className="p-0 ml-3" onClick={()=>alert("test")}>
                    <Icon
                        name="settings-outline"
                        font="MaterialCommunityIcons"
                        color="#777777"
                        size={25}/>
                </Button>

                <Dropdown className="p-0 ml-2" alignRight>
                    
                    <Dropdown.Toggle as={AccountToggle}>
                        <Icon
                            name="account-circle"
                            font="MaterialCommunityIcons"
                            color="#777777"
                            size={25}/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <div className="name d-flex flex-row align-items-center">
                                <Icon
                                    name="account-outline"
                                    font="MaterialCommunityIcons"
                                    size={23}/>
                                <div className="d-inline-block font-medium ml-2 bold-medium">{authObject.getUser().getName()}</div>
                            </div>
                        </Dropdown.Item>
                        
                        <Dropdown.Divider />

                        <Dropdown.Item>
                            <div className="name d-flex flex-row align-items-center" onClick={onChangePassword.bind(this)}>
                                <Icon
                                    name="lock-reset"
                                    font="MaterialCommunityIcons"
                                    size={22}/>
                                <div className="d-inline-block font-medium ml-2">Change password</div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <div className="name d-flex flex-row align-items-center" onClick={doLogout.bind(this)}>
                                <Icon
                                    name="logout"
                                    font="MaterialCommunityIcons"
                                    size={22}/>
                                <div className="d-inline-block font-medium ml-2">Sign out</div>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </>
    )
}

export default Header