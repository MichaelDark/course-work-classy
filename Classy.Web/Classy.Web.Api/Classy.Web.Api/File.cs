using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Classy.Web.Api
{
    public class File
    {
        public string Name { get; set; }
        public string Base64Content { get; set; }

        public File (string name, string base64Content)
        {
            Name = name;
            Base64Content = base64Content;
        }
    }
}
