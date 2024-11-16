import './css/App.css';
import RoutesConfig from './router/index'
import PageFooter from './components/PageFooter';
import NavHeader from './components/NavHeader';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout

function App() {
  return (
    <div className="App">
      <Header className='header'>
        <NavHeader />
      </Header>
      <Content className='content'>
        <RoutesConfig />
      </Content>
      <Footer className='footer'>
        <PageFooter />
      </Footer>      
    </div>
  );
}

export default App;
