# tawk-statistics
There is  chat statistics for each day by a unique website Id.
The file contains stats collected over 14 days.
Each entry contains:

● Website Id

● Date

● Total number of chats

● Total number of missed chats

There will only be one entry for a website per day.

For example, if there are a total of 5 websites for a period of 14 days, there will be 70 entries in the
file.

The stats file can be found here:

https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json
## Task
Write a program that will fetch the statistics from the URL which outputs the sum of chats and
missed chats per website Id for a given date range.
If the date range is not provided, the sum should be calculated for the entire data set.
Example without date range option
`processStatistics()`

output:
[{
websiteId: '4f8b36d00000000000111111',
chats: 100,
missedChats: 10
}, {
websiteId: '4f8b36d00000000000222222',
chats: 50,
missedChats: 5
}, ...]

### Example with date range option
/*
* processStatistics(start, end)
*/

`processStatistics(new Date(2019, 3, 1), new Date(2019, 2, 1))`

output:
[{
websiteId: '4f8b36d00000000000111111',
chats: 50,
missedChats: 1
}, {
websiteId: '4f8b36d00000000000222222',
chats: 25,
missedChats: 2
}, ...]
