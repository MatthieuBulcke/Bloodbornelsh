using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

class ModelManager
{
    protected void bdd;

  public static construct()
  {
   try
   {
      // DEV LOCAL
      Console.WriteLine("Openning Connection ...");
      this -> bdd = new MySqlConnection("Server=" + "db.3wa.io" + ";Database=" + "matthieubul_BBD" + ";User Id=" + "matthieubul" + ";password=" + "27fffced399becaf037ec36ef0e5c6fb");
      Console.WriteLine("Connection successful!");
      // VOIR ERREURS MYSQL
      this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
      Console.WriteLine(string.Join(", ", this->bdd));
   }

   catch (Exception e)
   {
      Console.WriteLine("Error: " + e.Message);
   }
  }
}