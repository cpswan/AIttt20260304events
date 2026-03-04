import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as io;
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf_static/shelf_static.dart';

void main(List<String> args) async {
  final app = Router();

  // Dummy talk data
  final talks = [
    {
      'time': '10:00 AM - 11:00 AM',
      'title': 'The Future of Dart on the Server',
      'speakers': ['Dr. Evelyn Reed'],
      'categories': ['Dart', 'Server', 'Future'],
      'description': 'A deep dive into the evolving landscape of server-side Dart, exploring new features, performance improvements, and the roadmap ahead.'
    },
    {
      'time': '11:10 AM - 12:10 PM',
      'title': 'Frontend Fun with Standard Web Tech',
      'speakers': ['Alex Chen', 'Ben Carter'],
      'categories': ['HTML', 'CSS', 'JavaScript'],
      'description': 'Rediscover the power and simplicity of standard HTML, CSS, and JavaScript. This talk will showcase how to build modern, interactive web UIs without relying on heavy frameworks.'
    },
    {
      'time': '1:30 PM - 2:30 PM',
      'title': 'AI-Powered Development',
      'speakers': ['Samantha Jones'],
      'categories': ['AI', 'Development', 'Tools'],
      'description': 'Explore how artificial intelligence is changing the game for developers. From code generation to bug detection, learn about the latest AI-powered tools that can boost your productivity.'
    勝
    {
      'time': '2:40 PM - 3:40 PM',
      'title': 'The Art of API Design',
      'speakers': ['Michael Rodriguez'],
      'categories': ['API', 'Design', 'Architecture'],
      'description': 'A guide to designing APIs that are intuitive, scalable, and a joy to work with. This session covers RESTful principles, GraphQL, and best practices for versioning and documentation.'
    },
    {
      'time': '4:00 PM - 5:00 PM',
      'title': 'Securing Your Web Applications',
      'speakers': ['Olivia Martinez', 'David Lee'],
      'categories': ['Security', 'Web'],
      'description': 'Learn how to protect your web applications from common vulnerabilities. This talk covers topics like cross-site scripting (XSS), SQL injection, and how to implement a secure authentication and authorization system.'
    },
    {
      'time': '5:10 PM - 6:10 PM',
      'title': 'Flutter for Web: Beyond Mobile',
      'speakers': ['Maria Garcia'],
      'categories': ['Flutter', 'Web', 'UI'],
      'description': 'Discover how to leverage your Flutter skills to build beautiful and performant web applications. This talk will cover the latest updates to Flutter for web and share tips for creating responsive UIs.'
    }
  ];

  app.get('/api/talks', (Request request) {
    return Response.ok(
      json.encode(talks),
      headers: {'Content-Type': 'application/json'},
    );
  });

  final staticHandler = createStaticHandler('public', defaultDocument: 'index.html');

  final handler = Cascade()
      .add(staticHandler)
      .add(app)
      .handler;

  final server = await io.serve(handler, 'localhost', 8080);
  print('Serving at http://${server.address.host}:${server.port}');
}
