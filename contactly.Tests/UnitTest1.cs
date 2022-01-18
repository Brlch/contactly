using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using Xunit;

namespace contactly.Tests
{
    public class UnitTest1
    {
        [Fact]
        public async void TestGetAllContacts()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://localhost:5001/Contact");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            Assert.NotEmpty(responseBody);
        }

    }
}
