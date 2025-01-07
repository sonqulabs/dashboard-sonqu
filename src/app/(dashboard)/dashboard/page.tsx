import { Star, TrendingUp, Users, Utensils } from 'lucide-react';

export default function Dashboard() {
	return (
		<div className="container mx-auto p-6">
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
					<div className="flex flex-row items-center justify-between pb-2">
						<div className="text-sm font-medium text-gray-600">
							Total Recipes
						</div>
						<Utensils className="h-5 w-5 text-gray-400" />
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-800">248</div>
						<p className="text-xs text-gray-500 mt-1">
							+12 desde el mes pasado
						</p>
					</div>
				</div>

				<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
					<div className="flex flex-row items-center justify-between pb-2">
						<div className="text-sm font-medium text-gray-600">
							Average Rating
						</div>
						<Star className="h-5 w-5 text-yellow-500" />
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-800">4.6</div>
						<p className="text-xs text-gray-500 mt-1">
							+0.2 desde el mes pasado
						</p>
					</div>
				</div>

				<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
					<div className="flex flex-row items-center justify-between pb-2">
						<div className="text-sm font-medium text-gray-600">Total Views</div>
						<Users className="h-5 w-5 text-gray-400" />
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-800">45,231</div>
						<p className="text-xs text-gray-500 mt-1">
							+20% desde el mes pasado
						</p>
					</div>
				</div>

				<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
					<div className="flex flex-row items-center justify-between pb-2">
						<div className="text-sm font-medium text-gray-600">
							Most Popular Category
						</div>
						<TrendingUp className="h-5 w-5 text-blue-500" />
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-800">Italian</div>
						<p className="text-xs text-gray-500 mt-1">
							25% de todas las recetas
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
