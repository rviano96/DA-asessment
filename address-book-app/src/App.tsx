import { Navigate, Route, Routes } from 'react-router-dom';
import CreateContact from './components/Contact/Create/Create';
import EditContact from './components/Contact/Edit/Edit';
import List from './components/Contact/List/List';
import { BASE_PATH, CONTACT_BASE_PATH, CONTACT_CREATE_PATH, CONTACT_EDIT_PATH } from './Constants';
import { Container } from './Styles';

function App() {
  return (
    <Container>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={BASE_PATH} replace />}
        />
        <Route
          path={BASE_PATH}
          element={<Navigate to={CONTACT_BASE_PATH} replace />}
        />
        <Route path={CONTACT_BASE_PATH} element={<List />} />
        <Route path={CONTACT_CREATE_PATH} element={<CreateContact />} />
        <Route path={`${CONTACT_EDIT_PATH}/:id`} element={<EditContact />} />
      </Routes>
    </Container>
  );
}

export default App;
