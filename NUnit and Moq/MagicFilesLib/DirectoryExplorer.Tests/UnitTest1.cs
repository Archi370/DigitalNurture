using System;
using System.Collections.Generic;
using NUnit.Framework;
using Moq;
using MagicFilesLib;

namespace DirectoryExplorer.Tests
{
    [TestFixture]
    public class DirectoryExplorerTests
    {
        private Mock<IDirectoryExplorer> _mockExplorer;
        private readonly string _file1 = "file.txt";
        private readonly string _file2 = "file2.txt";

        [SetUp]
        public void Setup()
        {
            _mockExplorer = new Mock<IDirectoryExplorer>();
        }

        [TestCase(@"C:\MockDirectoryPath")]
        public void GetFiles_ValidPath_ReturnsMockedCollectionAndMatchesCount(string path)
        {
            var dummyFiles = new List<string> { _file1, _file2 };
            _mockExplorer.Setup(x => x.GetFiles(It.IsAny<string>())).Returns(dummyFiles);

            var result = _mockExplorer.Object.GetFiles(path);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result, Does.Contain(_file1));
        }
    }
}