async function getData() {
    const res = await fetch('https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP', {
        next: {
            revalidate: 0,
        }
      })
    // The return value is *not* serialized
    // I can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // Activate closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
        /*.then(data => {
        console.log(data);
        return data;
      });*/
  }
   
  export default async function FoodGenerator() {
    const data = await getData()
   
    return (
        <main>
            {data.meals.map((meal) => (
                <div key={meal.idMeal}>
                    {/* data for meals */}
                    <h2>{meal.strMeal}</h2>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
            ))}
        </main>
    );
}