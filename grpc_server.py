import grpc
from concurrent import futures
import maze_pb2
import maze_pb2_grpc

class MazeService(maze_pb2_grpc.MazeServiceServicer):
    def SolveMaze(self, request, context):
        # Dummy implementation
        return maze_pb2.MazeResponse(path=[1, 2, 3, 4])

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
    maze_pb2_grpc.add_MazeServiceServicer_to_server(MazeService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
