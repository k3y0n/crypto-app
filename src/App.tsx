import { useState } from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { getCoins } from "./lib/api";
import CoinPage from "./pages/CoinPage/CoinPage";
import Home from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { SortSettings } from "./types/sort";
import styles from "./App.module.scss";

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortSettings, setSortSettings] = useState<SortSettings>({
		column: "",
		direction: "asc",
	});

	const { data, isFetching, isError } = useQuery(["coins"], () =>
		getCoins(sortSettings.column, sortSettings.direction, currentPage)
	);

	const handleSort = (column: string) => {
		setSortSettings((prevSettings) => {
			if (column === prevSettings.column) {
				return {
					...prevSettings,
					direction: prevSettings.direction === "asc" ? "desc" : "asc",
				};
			}
			return { ...prevSettings, column };
		});
	};

	if (isFetching) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching data</div>;
	}

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						data && (
							<Home
								coins={data}
								handleSort={handleSort}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								sortSettings={sortSettings}
							/>
						)
					}
				/>
				<Route path="/coin/:id" element={<CoinPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
