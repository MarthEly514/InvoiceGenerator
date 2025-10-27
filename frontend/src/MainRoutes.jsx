import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Edition from '../pages/Edition';

function MainRoutes({ mode }) {
    return (
        <Routes>
            <Route path="/" element={<Landing mode={mode} />} />
            <Route path="/edition" element={<Edition mode={mode} />} />
        </Routes>
    );
}
export default MainRoutes;