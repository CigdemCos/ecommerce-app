import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {
  constructor(){
    super();

    this.state = {
        currentUser: null
    }
}


unsubscribeFromAuth = null 


componentDidMount(){
 this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{

  if(userAuth){ //if a user sign-in
    const userRef = await createUserProfileDocument(userAuth);

    userRef.onSnapshot(snapshot =>{
      //console.log(snapshot.data());
      this.setState({
        currentUser:{
          id: snapshot.id,
          ...snapshot.data()
        }
      });

     // console.log(this.state);

    });
   }else{
     this.setState({currentUser:userAuth}) //we know it will be null
   }
  });

}

componentWillUnmount(){ //that will close the subscription
  this.unsubscribeFromAuth(); 
}

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
         <Route exact path='/' component={HomePage}/>
         <Route path= '/shop' component ={ShopPage}/>
         <Route path= '/signin' component ={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
