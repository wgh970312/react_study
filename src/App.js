import './App.css'
// import { Link, Route, BrowserRouter as Router, Switch, Prompt } from 'react-router-dom'
import { Link, Route, BrowserRouter as Router, Switch, withRouter, useRouteMatch, useHistory, useLocation, useParams } from './react-router-mini'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'
import _404Page from './pages/404Page'
import WelComePage from './pages/WelcomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>

        <Switch>
          <Route 
            exact 
            path="/" 
            // children={() => <div>不管匹配不匹配我都将渲染children</div>} 
            component={HomePage} 
            // render={() => <div>render</div>}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login/test" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/product/:id" component={Product} /> */}
          <Route path="/product/:id" render={() => <Product />} />
          <Route path="/welcome" component={WelComePage} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  )
}

export default App

// function Product(props) {
//   const { params, url } = props.match  
//   const { id } = params
//   return (
//     <div>
//       Product{id}
//       <Link to={url+'/detail'}>商品详情</Link>
//       <Route path={url+'/detail'} component={Detail} />
//     </div>
//   )
// }

// const Product = withRouter(props => {
//   const { params, url } = props.match  
//   const { id } = params
//   return (
//     <div>
//       Product{id}
//       <Link to={url+'/detail'}>商品详情</Link>
//       <Route path={url+'/detail'} component={Detail} />
//     </div>
//   )
// })

const Product = props => {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { url } = match
  const { id } = params
  console.log(match, history, location, params);
  return (
    <div>
      Product{id}
      <Link to={url+'/detail'}>商品详情</Link>
      <Route path={url+'/detail'} component={Detail} />
    </div>
  )
}

function Detail(props) {
  console.log('detail', props);
  return (
    <div>商品详情页</div>
  )
}
