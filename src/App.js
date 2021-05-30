import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Chat from './components/Chat';
import Login from './components/Login';
import Registration from './components/Registration';
import AuthProvider from './services/AuthProvider';
import ProtectedRouter from './utils/ProtectedRouter';

const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.background};
	height: 100vh;
	/* display: grid;
  place-items: center; */
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
`;

// const Container = styled.div`
//   display: flex;
//   background-color: ${({ theme }) => theme.colors.primary};
//   height: 90%;
//   width: 90vw;
//   box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
// `;

const App = () => (
	// const [{ user }, dispatch] = useStateValue();

	<AuthProvider>
		<Wrapper>
			<Router>
				<Switch>
					<ProtectedRouter exact path='/' component={Chat} />
					<ProtectedRouter path='/room/:id' component={Chat} />
					{/* <Route path='/room/:id'>
						<Chat />
					</Route>
					<Route path='/'>
						<Chat />
					</Route> */}
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/registration'>
						<Registration />
					</Route>
				</Switch>
			</Router>
		</Wrapper>
	</AuthProvider>
);
export default App;
