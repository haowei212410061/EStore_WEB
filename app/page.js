import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import { AboutUsContent, ContactUs, BrandContent } from "@/lib/LocalData";
import ProductList from "@/components/CardList";
import AboutCard from "@/components/AboutCard";
import { FetchAllProduct } from "@/graphql/ClientAPI/queryUtils";
import Footer from "@/components/footer";
import Home from "@/components/pages/Home";
export default async function pages() {
  return <Home />;
}
