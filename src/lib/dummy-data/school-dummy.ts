import SmansaLogo from "@/assets/smansa.png";
import AmikomLogo from "@/assets/amikom.png";
export type SchoolSchemasDTO = {
  name: string;
  major: string;
  address: string;
  city: string;
  province: string;
  images: string;
  status: string;
};

export const dummySchool: SchoolSchemasDTO[] = [
  {
    name: "Universitas Amikom Yogyakarta",
    major: "S1 Teknik Informatika",
    address:
      "Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman",
    city: "Yogyakarta",
    province: "Daerah Istimewa Yogyakarta",
    images: AmikomLogo.src,
    status: "Lulus",
  },
  {
    name: "SMAN 1 Kota Serang",
    major: "IPA",
    address:
      "Jl. Jenderal Ahmad Yani Serang No.39, RT.2/RW.5, Cimuncang, Kec. Serang",
    city: "Serang",
    province: "Banten",
    images: SmansaLogo.src,
    status: "Lulus",
  },
];
