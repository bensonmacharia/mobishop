import Categories from "@/components/Categories";
import Contacts from "@/components/Contacts";
import Products from "@/components/Products";
import HeaderMain from "@/components/HeaderMain";
import HeaderTop from "@/components/HeaderTop";

export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <HeaderTop />
      <HeaderMain />
      <Categories />
      <Products />
      <Contacts />
    </main>
  );
}
