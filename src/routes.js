import React , {lazy} from 'react'
import Root from './Root'
import App from './App'

import {Redirect} from 'react-router-dom'
import LazyLoad from './components/LazyLoad'

const lazyAuthIndex = lazy(()=>import('./pages/Auth'))
const AuthIndex = (props) => <LazyLoad component={lazyAuthIndex} {...props}/>

const lazySignUp = lazy(()=>import('./pages/Auth/AuthSignUp'))
const AuthSignUp = (props) => <LazyLoad component={lazySignUp} {...props}/>

const lazySignIn= lazy(()=>import('./pages/Auth/AuthSignIn'))
const AuthSignIn = (props) => <LazyLoad component={lazySignIn} {...props}/>

const lazyConfirmSignUp= lazy(()=>import('./pages/Auth/AuthConfirmSignUp'))
const AuthConfirmSignUp = (props) => <LazyLoad component={lazyConfirmSignUp} {...props}/>

const lazyForgotPassword = lazy(()=>import('./pages/Auth/AuthForgotPassword'))
const AuthForgotPassword = (props) => <LazyLoad component={lazyForgotPassword} {...props}/>

const lazyChangePassword = lazy(()=>import('./pages/Auth/AuthCompleteNewPassword'))
const AuthCompleteNewPassword = (props) => <LazyLoad component={lazyChangePassword} {...props}/>

const lazyResetPassword = lazy(()=>import('./pages/Auth/AuthResetPassword'))
const AuthResetPassword = (props) => <LazyLoad component={lazyResetPassword} {...props}/>

const lazyDashboard = lazy(()=>import('./pages/Dashboard'))
const Dashboard = props => <LazyLoad component={lazyDashboard} {...props}/>

const lazyAccount = lazy(()=>import('./pages/Account'))
const Account = props => <LazyLoad component={lazyAccount} {...props}/>

const lazyUser = lazy(()=>import('./pages/User'))
const User = props => <LazyLoad component={lazyUser} {...props}/>

const lazyVenue = lazy(()=>import('./pages/Venue'))
const Venue = props => <LazyLoad component={lazyVenue} {...props}/>

const lazyFacility = lazy(()=>import('./pages/Facility'))
const Facility = props => <LazyLoad component={lazyFacility} {...props}/>

const lazyBooking = lazy(()=>import('./pages/Booking'))
const Booking = props => <LazyLoad component={lazyBooking} {...props}/>

const lazyTicket = lazy(()=>import('./pages/Ticket'))
const Ticket = props => <LazyLoad component={lazyTicket} {...props}/>

// const lazyVisitor = lazy(()=>import('./pages/Visitor'))
// const Visitor = props => <LazyLoad component={lazyVisitor} {...props}/>

const lazyPromo = lazy(()=>import('./pages/Promo'))
const Promo = props => <LazyLoad component={lazyPromo} {...props}/>

const lazyReview = lazy(()=>import('./pages/Review'))
const Review = props => <LazyLoad component={lazyReview} {...props}/>

const lazyAccess = lazy(()=>import('./pages/Access'))
const Access = props => <LazyLoad component={lazyAccess} {...props}/>

const lazyPayment = lazy(()=>import('./pages/Payment'))
const Payment = props => <LazyLoad component={lazyPayment} {...props}/>

const lazySupport = lazy(()=>import('./pages/Support'))
const Support = props => <LazyLoad component={lazySupport} {...props}/>

const routes = [{
    component:Root,
    routes:[
        {
            exact:true,
            path:"/",
            component:()=><Redirect to="/app/"/>
        },
        {
            exact:true,
            path:"/auth",
            component:()=><Redirect to="/auth/login"/>
        },
        {   
            path:"/auth/*",
            component: AuthIndex,
            routes:[
                {
                    path:"/auth/login",
                    name:"Sign In",
                    component:AuthSignIn
                },
                {
                    path:"/auth/register",
                    name:"Register new Account",
                    component:AuthSignUp
                },
                {
                    path:"/auth/confirm_signup",
                    name:"Confirm Registration",
                    component:AuthConfirmSignUp
                },
                {
                    path:"/auth/forgot_password",
                    name:"Forgot Password",
                    component:AuthForgotPassword
                },
                {
                    path:"/auth/require_new_password",
                    name:"Create new password",
                    component:AuthCompleteNewPassword
                },
                {
                    path:"/auth/reset_password",
                    name:"Reset password",
                    component:AuthResetPassword
                }
            ]
        },
        {
            exact:true,
            path:"/app",
            component:()=><Redirect to="/app/dashboard"/>
        },
        {
            path:"/app/*",
            component:App,
            routes:[
                {
                    path:"/app/dashboard",
                    url:"/app/dashboard",
                    name:"Dashboard",
                    group:{sidebarMenu1:true},
                    icon:{ name:"monitor-dashboard",font:"MaterialCommunityIcons"},
                    component:Dashboard
                },
                {
                    path:"/app/account",
                    url:"/app/account",
                    name:"Account",
                    group:{sidebarMenu2:true},
                    icon:{ name:"account-box-multiple",font:"MaterialCommunityIcons"},
                    component:Account
                },
                {
                    path:"/app/user",
                    url:"/app/user",
                    name:"User",
                    group:{sidebarMenu2:true},
                    icon:{ name:"account-multiple-outline",font:"MaterialCommunityIcons"},
                    component:User
                },
                {
                    path:"/app/venue",
                    url:"/app/venue",
                    name:"Venue",
                    group:{sidebarMenu3:true},
                    icon:{ name:"map-marker-outline",font:"MaterialCommunityIcons"},
                    component:Venue
                },
                {
                    path:"/app/facility",
                    url:"/app/facility",
                    name:"Facility",
                    group:{sidebarMenu3:true},
                    icon:{ name:"soccer",font:"MaterialCommunityIcons"},
                    component:Facility
                },
                {
                    path:"/app/promo",
                    url:"/app/promo",
                    name:"Promo",
                    group:{sidebarMenu3:true},
                    icon:{ name:"ticket-percent",font:"MaterialCommunityIcons"},
                    component:Promo
                },
                {
                    path:"/app/booking",
                    url:"/app/booking",
                    name:"Booking",
                    group:{sidebarMenu3:true},
                    icon:{ name:"note-multiple-outline",font:"MaterialCommunityIcons"},
                    component:Booking
                },
                {
                    path:"/app/payment",
                    url:"/app/payment",
                    name:"Payment",
                    group:{sidebarMenu3:true},
                    icon:{ name:"cash-multiple",font:"MaterialCommunityIcons"},
                    component:Payment
                },
                {
                    path:"/app/ticket",
                    url:"/app/ticket",
                    name:"Ticket",
                    group:{sidebarMenu3:true},
                    icon:{ name:"ticket-outline",font:"MaterialCommunityIcons"},
                    component:Ticket
                },
                // {
                //     path:"/app/visitor",
                //     url:"/app/visitor",
                //     name:"Visitor",
                //     group:{sidebarMenu3:true},
                //     icon:{ name:"account-group",font:"MaterialCommunityIcons"},
                //     component:Visitor
                // },
                {
                    path:"/app/review",
                    url:"/app/review",
                    name:"Review",
                    group:{sidebarMenu3:true},
                    icon:{ name:"comment-multiple-outline",font:"MaterialCommunityIcons"},
                    component:Review
                },
                {
                    path:"/app/access",
                    url:"/app/access",
                    name:"Access",
                    group:{sidebarMenu4:true},
                    icon:{ name:"account-box-outline",font:"MaterialCommunityIcons"},
                    component:Access
                },
                {
                    path:"/app/support",
                    url:"/app/support",
                    name:"Support",
                    group:{sidebarMenu4:true},
                    icon:{ name:"headset",font:"MaterialCommunityIcons"},
                    component:Support
                }
            ]
        },
        {
            path:"*",
            component:()=><div>Not found</div>
        }
    ]
}]


export default routes