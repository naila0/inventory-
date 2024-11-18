import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgSS-chZUH5T47nhRNeK6jYDnGZK_TQSA",
  authDomain: "insan-cemerlang-d6eb1.firebaseapp.com",
  projectId: "insan-cemerlang-d6eb1",
  storageBucket: "insan-cemerlang-d6eb1.appspot.com",
  messagingSenderId: "162904381844",
  appId: "1:162904381844:web:dd88782fdcc494c9ac1781",
  measurementId: "G-1RSX6TCWZ2"
};

export async function ambilDaftarInventory() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah, 
      harga: dokumen.data().harga 
    })
  })
  
  return hasilKueri;
}

const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

export async function tambahInventory(item, jumlah, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen =await addDoc(collection(basisdata,"inventory"), {
      item: item,
      jumlah: jumlah,
      harga: harga
    })
    
    //menampilkan pesan hasil 
    console.log("berhasil menyimpan data inventory")
  } catch (error) {
    //menampilkan pesan gagal
    console.log("gagal menyimpan data inventory")
  }
}

export async function hapusinventory(id) {
  await deleteDoc(doc(basisdata, "inventory", id))
}

export async function ubahInventory(id, itembaru, jumlahbaru, hargabaru) {
  await updateDoc(
    doc(basisdata, "inventory", id),
    {item: itembaru, jumlah: jumlahbaru, harga: hargabaru}
    )
}
export async function ambilInventory(id) {
  const refDokumen = await doc(basisdata, "inventory", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}