import { useState } from "react"
import { useSelector } from "react-redux"
import useCartProducts from "../hooks/useCartProducts"
import { PAGE_SIZE } from "../constants/pagination"

import Search from "../components/Search"
import Spinner from "../components/Spinner"
import Error from "../components/Error"
import ProductCard from "../components/products/ProductCard"
import Pagination from "../components/Pagination"

import "./ProductList.css"

export default function ProductList() {
	const [page, setPage] = useState(1)
	const [prevTerm, setPrevTerm] = useState("")

	const term = useSelector((state) => state.search.term)

	if (term !== prevTerm) {
		setPrevTerm(term)
		setPage(1)
	}

	const { products, total, loading, error } = useCartProducts(
		page,
		PAGE_SIZE,
		term,
	)
	const totalPages = Math.ceil(total / PAGE_SIZE)

	if (loading) return <Spinner message="Loading products..." />
	if (error) return <Error message={error} />

	return (
		<div className="products-container">
			<Search />

			<p className="products-title">Product List</p>

			<div className="product-container">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
		</div>
	)
}
