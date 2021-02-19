Instructions for starting and accessing docker website

<h1>Lab 2</h1>
<ul>
  <li>Build Command: "docker build -t mtech-dockerUM:latest ."</li>
  <li>Run Command: "docker run -d --rm --name &lt;NAME&gt; -p 8080:8080 mtech-dockerUM:latest"</li>
  <li>Navigate to localhost:8080</li>
</ul>
<h1>Lab 3</h1>
<ul>
  <li>Deploy Command: "docker stack deploy -c docker-compose.yaml &lt;STACK_NAME&gt;"</li>
  <li>Scale Command: "docker service scale &lt;STACK_NAME&gt;_mywebsite=7"</li>
  <li>Remove Command: "docker stack rm &lt;STACK_NAME&gt;"</li>
</ul>