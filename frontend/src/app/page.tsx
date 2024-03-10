import Categories from "@/components/Categories";
import Contacts from "@/components/Contacts";
import Products from "@/components/Products";
import HeaderMain from "@/components/HeaderMain";

export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <HeaderMain />
      <Categories />
      <Products />
      <Contacts />
    </main>
  );
}
