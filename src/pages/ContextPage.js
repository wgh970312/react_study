import {Component} from "react";
import {ThemeProvider} from "../Context";
import ConsumerPage from "./ConsumerPage";
import ContextTypePage from "./ContextTypePage";
import UseContextPage from "./UseContextPage";
export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "小明"
      }
    };
  }

  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {themeColor: themeColor === "red" ? "green" : "red"}
    });
  };
  render() {
    const {theme} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
        <ThemeProvider value={theme}>
          <ConsumerPage />
          <ContextTypePage />
          <UseContextPage />
        </ThemeProvider>
      </div>
    );
  }
}

// 1. 创建context createContext
// 2. Provider value
// 3. 使用 ContextType Consumer useContext