using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Drawing;
using System.Net;
using System.Net.Http;
using System.Text;

namespace Classy.Web.Api.Hubs
{
    public class ClassyHub : Hub
    {
        public static Dictionary<ClaimsPrincipal, List<File>> Storage = new Dictionary<ClaimsPrincipal, List<File>>();
        public static string BaseURL { get; set; } = @"https://classy-classifier.herokuapp.com/classifier";
        public async Task SendTest(string base64String, string format, string name)
        {
            int startIndex = 13 + format.Length;
            base64String = base64String.Substring(startIndex, base64String.Length - startIndex);
            if (Storage.ContainsKey(this.Context.User))
            {
                Storage[this.Context.User].Add(new File(name, base64String));
            }
            else
            {
                Storage.Add(this.Context.User, new List<File>() { new File(name, base64String) });
            }
            byte[] bytes = new byte[1];
            try
            {
                bytes = Convert.FromBase64String(base64String);
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("response", e.Message);
            }
            using (var stream = new MemoryStream(bytes, 0, bytes.Length))
            {
                var URL = BaseURL + @"/classify_single";
                var response = await SendToServer(URL, stream, name);
                await Clients.Caller.SendAsync("response", response);
            }
        }

        public async Task<string> SendToServer(string URL, Stream imageStream, string fullFileName)
        {
            HttpContent streamParameter = new StreamContent(imageStream);
            using (var client = new HttpClient())
            {
                using (var formData = new MultipartFormDataContent())
                {
                    formData.Add(streamParameter, "image", "image");
                    var response = await client.PostAsync(URL, formData);
                    return await response.Content.ReadAsStringAsync();
                }

            }
        }



    }
}
