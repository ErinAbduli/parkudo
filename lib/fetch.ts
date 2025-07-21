import { useCallback, useEffect, useState } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetchAPI(url, options);
			setData(result.data);
		} catch (error) {
			setError((error as Error).message || "An error occurred");
		} finally {
			setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	return { data, error, loading, refetch: fetchData };
};
