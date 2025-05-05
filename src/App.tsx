import {Routes, Route} from 'react-router-dom'
import {Toaster} from '@/components/ui/sonner'
import Editor from '@/pages/Editor'

function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route
					path="/form/:id"
					element={<Editor />}
				/>
			</Routes>
		</>
	)
}

export default App
