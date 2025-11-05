import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Edition from '../pages/Edition';
import Test from './components/Test';

function MainRoutes({ mode }) {
    return (
        <Routes>
            <Route path="/" element={<Landing mode={mode} />} />
            <Route path="/edition" element={<Edition mode={mode} />} />
            <Route path="/test" element={<Test mode={mode} />} />
        </Routes>
    );
}
export default MainRoutes;