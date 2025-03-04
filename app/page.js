import Link from "next/link";
import page from "./week-2/page";
export default function Home() {
  return(
  <div>
  <p><Link href= "/week-2">go to week 2 </Link></p>
  <p><Link href= "/week-3">go to week 3 </Link></p>
  <p><Link href= "/week-4">go to week 4 </Link></p>
  <p><Link href= "/week-5">go to week 5 </Link></p>
  <p><Link href= "/week-6">go to week 6 </Link></p>

  </div>);
}//main page
