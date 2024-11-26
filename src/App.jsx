import './css/App.css';
import RoutesConfig from './router/index'
import PageFooter from './components/PageFooter';
import NavHeader from './components/NavHeader';
import LoginForm from './components/LoginForm';
import { Layout } from 'antd';
import { useState } from 'react';

const { Header, Footer, Content } = Layout

function App() {

  const [showLoginModal, setShowLoginModal] = useState(false)

  function loginHandle() {
    setShowLoginModal(true)
  }

  function closeModal () {
    setShowLoginModal(false)
  }

  return (
    <div className="App">
      <Header className='header'>
        <NavHeader loginHandle={loginHandle} />
      </Header>
      <Content className='content'>
        <RoutesConfig />
      </Content>
      <Footer className='footer'>
        {/* <PageFooter /> */}
      </Footer>
      {/* 登录注册弹窗 */}
      <LoginForm isShow={showLoginModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
