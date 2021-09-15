# Tutorial APAP
## Authors
* **Karina Aulia Putri** - *1906298954* - *C*
---
## Tutorial 2
1. **Cobalah untuk menambahkan sebuah Bioskop dengan mengakses link berikut:
   [http://localhost:8080/bioskop/add?idBioskop=1&namaBioskop=Bioskop%20PAPA%20
   APAP&alamat=Maung%20Fasilkom&noTelepon=081xxx&jumlahStudio=10 ]()
   Apa yang terjadi? Jelaskan mengapa hal tersebut dapat terjadi**
   <br/> Terjadi Whitelabel Error Page, karena file add-bioskop.html belum dibuat, sedangkan link tersebut
   mengarah ke method addBioskop pada controller yang mereturn "add-bioskop"
   ![img_1.png](img_1.png)

2. **Pertanyaan 2: Menurut kamu anotasi @Autowired pada class Controller tersebut
   merupakan implementasi dari konsep apa? Dan jelaskan secara singkat cara kerja
   @Autowired tersebut dalam konteks service dan controller yang telah kamu buat**
   <br/> Konsep dependency injection.
   Spring Framework menyediakan fitur component-scan, sehingga ketika menggunakan anotasi @Autowired
   , Spring akan mencari komponen @Controller dan @Service dan melakukan inisialisasi, mengisi field
   yang membutuhkan komponen dari @Controller dan @Service tersebut. Dengan demikian,
   kita tidak perlu menambahkan setter atau constructor lagi.
3. **Cobalah untuk menambahkan sebuah Bioskop dengan mengakses link
   berikut:
   [http://localhost:8080/bioskop/add?idBioskop=1&namaBioskop=Bioskop%20PAPA%20
   APAP&alamat=Maung%20Fasilkom&noTelepon=081xxx]() Apa yang terjadi? Jelaskan
   mengapa hal tersebut dapat terjadi.**
   <br/> Terjadi Whitelabel Error Page. Hal ini terjadi dikarenakan parameter untuk jumlahStudio tidak dicantumkan
   pada link, padahal sudah diset required = true yang berarti wajib untuk diisi.
   ![img_3.png](img_3.png)
4. **Jika Papa APAP ingin melihat Bioskop dengan nama Bioskop Maung,
   link apa yang harus diakses?**
   <br/> Mungkin maksudnya alamat Bioskop Maung ya. Link yang bisa diakses adalah
   [http://localhost:8080/bioskop/view?idBioskop=1](http://localhost:8080/bioskop/view/id-bioskop/1)
5. **Tambahkan 1 contoh Bioskop lainnya sesukamu. Lalu cobalah untuk
   mengakses http://localhost:8080/bioskop/viewall , apa yang akan ditampilkan? Sertakan
   juga bukti screenshotmu.**
   <br/> Yang ditampilkan adalah seluruh bioskop yang tersimpan dalam listBioskop beserta detailnya.
   ![img_5.png](img_5.png)

## Tutorial 1
### What I have learned today

### Github
1. **Apa itu Issue Tracker? Apa saja masalah yang dapat diselesaikan dengan Issue Tracker?**
   <br/> _Issue Tracker_ digunakan untuk melacak _tasks_, _enhancements_, dan _bugs_ yang ada dalam pengerjaan suatu proyek.
   <br/> _Issue Tracker_ dapat membantu menyelesaikan permasalahan yang berkaitan dengan masalah lain, 
   menyimpan permasalahan yang ditemui in case suatu saat terjadi masalah yang sama kita dapat melihat solusinya
   kembali, kita juga bisa mendapat bantuan dari orang lain melalui fitur _mention_ yang disediakan, dan 
   dapat mengkategorikan permasalahan yang ada.<br/><br/>
2. **Apa perbedaan dari git merge dan git merge --squash?**
   <br/> Git merge adalah perintah untuk mengintegrasikan commit pada branch tertentu ke dalam satu branch, 
   sedangkan git merge --squash digunakan untuk menggabungkan semua commit yang ada pada suatu branch menjadi satu commit. <br/></br>
3. **Apa keunggulan menggunakan Version Control System seperti Git dalam pengembangan
   suatu aplikasi?**
   - mempermudah dalam melakukan pengembangan suatu aplikasi 
   secara kolaboratif
   - memungkinkan kita untuk mengembalikan kode yang sudah diubah
   - meng-_compare_ setiap perubahan dari kode
   - tracking orang yang melakukan perubahan pada _file_
   - dan lain-lain.
### Spring
4. **Apa itu library & dependency?**
   <br/>_Library_ adalah kode yang sudah ter-_compile_ yang dapat digunakan dalam suatu program.
   Ketika suatu program menggunakan _library_, maka program tersebut memiliki _dependency_ terhadap
   _library_ yang digunakan. Dependency dapat dibayangkan sebagai orang yang membantu melakukan suatu pekerjaan
   sehingga kita tidak perlu mengerjakan itu lagi, dalam hal ini, pekerjaan tersebut adalah coding :).
   <br/><br/>
5. **Apa itu Maven? Mengapa kita menggunakan Maven? Apakah ada alternatif dari Maven?**
   <br/>Maven adalah build automation tool untuk Java. Kita perlu menggunakan Maven untuk membantu dalam 
   mengubah konfigurasi yang rumit dalam pengerjaan proyek menjadi lebih sederhana. 
   Maven memiliki tiga komponen, yaitu: POM, direktori, dan repositori. Alternatif dari Maven
   salah satunya adalah Gradle. <br/><br/>
6. **Selain untuk pengembangan web, apa saja yang bisa dikembangkan dengan Spring
   framework?**
   <br/>Spring Framework bisa digunakan untuk pengembangan aplikasi apapun yang berbasis Java.
   Walaupun memang pada awalnya Spring Framework menyediakan module and extensions untuk web application,
   namun dikarenakan Spring Framework bersifat open source, saat ini Spring Framework sudah mulai dikembangkan
   untuk mobile app dan android. Berikut sumbernya: 
   - [https://projects.spring.io/spring-mobile/](https://projects.spring.io/spring-mobile/)
   - [https://projects.spring.io/spring-android/](https://projects.spring.io/spring-android/)
<br/><br/>
7. **Apa perbedaan dari @RequestParam dan @PathVariable? Kapan sebaiknya
   menggunakan @RequestParam atau @PathVariable?**
   @RequestParam digunakan untuk mendapatkan values dari query parameters, sedangkan @PathVariable
   mendapatkan values dari URI path. Kita bisa menggunakan @RequestParam jika memerlukan default value
   yang dibuat untuk meng-handle value yang kosong, kita tidak bisa menggunakan @PathVariable, karena jika
   value-nya kosong akan error.



### What I did not understand
- [] Konsep Inversion of Control (IoC)
- [] Konsep Dependency Injection
  (Anda dapat membuat tampilan code dalam README.md menjadi lebih baik. Cari tahu
  lebih dalam tentang penulisan README.md di GitHub pada link
  [berikut](https://help.github.com/en/articles/basic-writing-and-formatting-syntax))
