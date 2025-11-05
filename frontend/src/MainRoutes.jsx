import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Edition from '../pages/Edition';
import Test from './components/Test';
import Thanks from '../pages/Thanks';
import About from '../pages/About';
import Help from '../pages/Help';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';

function MainRoutes({ mode }) {
    return (
        <Routes>
            <Route path="/" element={<Landing mode={mode} />} />
            <Route path="/edition" element={<Edition mode={mode} />} />
            <Route path="/about" element={<About mode={mode} />} />
            <Route path="/help" element={<Help mode={mode} />} />
            <Route path="/thank-you" element={<Thanks mode={mode} />} />
            <Route path="/terms" element={<Terms mode={mode} />} />
            <Route path="/privacy" element={<Privacy mode={mode} />} />
            <Route path="/contact" element={<Contact mode={mode} />} />
            <Route path="/test" element={<Test mode={mode} />} />
        </Routes>
    );
}
export default MainRoutes;