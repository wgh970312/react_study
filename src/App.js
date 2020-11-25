import './App.css';
import ReduxPage from './pages/ReduxPage';

function App() {
  return (
    <div className="App">
      <ReduxPage />
    </div>
  );
}

// function f1(arg) {
//   console.log('f1', arg)
//   return arg
// }

// function f2(arg) {
//   console.log('f2', arg)
//   return arg
// }

// function f3(arg) {
//   console.log('f3', arg)
//   return arg
// }

// function compose(...funcs){
//   if(funcs.length === 0){
//     return arg => arg  
//   }

//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }

// console.log('compose', compose(f1, f2, f3)('omg'), compose()('111'))

export default App;
